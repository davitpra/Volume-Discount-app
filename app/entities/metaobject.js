/**
 * Represents a MetaObject with enhanced functionality.
 * @class
 */
export class MetaObject {
  /**
   * Create a MetaObject instance.
   * @param {Object} admin - The Shopify admin access object.
   */
  constructor(admin) {
    this.admin = admin;
    this.definitionCache = new Map();
  }

  /**
   * Define a new MetaObject.
   * @param {Object} definitionType - The MetaObject definition.
   * @returns {Promise<Object>} The created MetaObject definition.
   * @throws {Error} If required properties are missing or if there's an API error.
   */
  async define(definitionType) {
    const requiredProps = ["name", "type", "access", "fieldDefinitions"];
    const missingProps = requiredProps.filter(
      (prop) => !definitionType.hasOwnProperty(prop)
    );

    if (missingProps.length > 0) {
      throw new Error(
        `Definition required properties: ${missingProps.join(", ")}`
      );
    }

    const definition = {
      name: definitionType.name,
      type: definitionType.type,
      access: definitionType.access,
      fieldDefinitions: definitionType.fieldDefinitions,
    };

    const mutation = `#graphql
    mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
        metaobjectDefinitionCreate(definition: $definition) {
            metaobjectDefinition {
                name
                type
                fieldDefinitions {
                    name
                    key
                }
            }
            userErrors {
                field
                message
                code
            }
        }
    }`;

    try {
      const response = await this.admin.graphql(mutation, { variables: { definition } });
      const { data: { metaobjectDefinitionCreate } } = await response.json();

      if (metaobjectDefinitionCreate.userErrors.length > 0) {
        throw new Error(metaobjectDefinitionCreate.userErrors.map(e => e.message).join(', '));
      }

      this.definitionCache.set(definitionType.type, metaobjectDefinitionCreate.metaobjectDefinition);
      return metaobjectDefinitionCreate.metaobjectDefinition;
    } catch (error) {
      console.error('Error defining MetaObject:', error);
      throw error;
    }
  }

  /**
   * Get the definition of a MetaObject.
   * @param {Object} params - Parameters for getting the definition.
   * @param {string} params.type - The type of the MetaObject.
   * @returns {Promise<Object>} The MetaObject definition.
   * @throws {Error} If the type is missing or if there's an API error.
   */
  async getDefinition({ type }) {
    if (!type) {
      throw new Error(`Definition type is required`);
    }

    if (this.definitionCache.has(type)) {
      return this.definitionCache.get(type);
    }

    const query = `#graphql
    query {
        metaobjectDefinitionByType(type: "${type}") {
            id
            name 
            type
            fieldDefinitions {
                key
                name
            }
        }
    }`;

    try {
      const response = await this.admin.graphql(query);
      const { data: { metaobjectDefinitionByType } } = await response.json();

      if (!metaobjectDefinitionByType) {
        throw new Error(`No definition found for type: ${type}`);
      }

      this.definitionCache.set(type, metaobjectDefinitionByType);
      return metaobjectDefinitionByType;
    } catch (error) {
      console.error('Error getting MetaObject definition:', error);
      throw error;
    }
  }

  /**
   * Delete the definition of a MetaObject.
   * @param {Object} params - Parameters for deleting the definition.
   * @param {string} params.type - The type of the MetaObject to delete.
   * @returns {Promise<Object>} The result of the deletion operation.
   * @throws {Error} If there's an API error.
   */
  async deleteDefinition({ type }) {
    const definition = await this.getDefinition({ type });
    const mutation = `#graphql
    mutation DeleteMetaobjectDefinition($id: ID!) {
        metaobjectDefinitionDelete(id: $id) {
            deletedId
            userErrors {
                field
                message
                code
            }
        }
    }`;

    try {
      const response = await this.admin.graphql(mutation, { variables: { id: definition.id } });
      const { data: { metaobjectDefinitionDelete } } = await response.json();

      if (metaobjectDefinitionDelete.userErrors.length > 0) {
        throw new Error(metaobjectDefinitionDelete.userErrors.map(e => e.message).join(', '));
      }

      this.definitionCache.delete(type);
      return metaobjectDefinitionDelete;
    } catch (error) {
      console.error('Error deleting MetaObject definition:', error);
      throw error;
    }
  }

  /**
   * Create a new MetaObject instance.
   * @param {Object} params - Parameters for creating the MetaObject.
   * @param {string} params.type - The type of the MetaObject.
   * @param {Array} params.fieldDefinitions - The field definitions.
   * @param {Object} data - The data for the MetaObject fields.
   * @returns {Promise<Object>} The created MetaObject.
   * @throws {Error} If there's an API error.
   */
  async create({ type, fieldDefinitions }, data) {
    const fields = fieldDefinitions.map((def) => ({
      key: def.key,
      value: data[def.key],
    }));

    const mutation = `#graphql
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
        metaobjectCreate(metaobject: $metaobject) {
            metaobject {
                id
                handle
                type
            }
            userErrors {
                field
                message
                code
            }
        }
    }`;

    try {
      const response = await this.admin.graphql(mutation, { 
        variables: { metaobject: { type, fields } } 
      });
      const { data: { metaobjectCreate: { metaobject, userErrors } } } = await response.json();

      if (userErrors.length > 0) {
        throw new Error(userErrors.map(e => e.message).join(', '));
      }

      return metaobject;
    } catch (error) {
      console.error('Error creating MetaObject:', error);
      throw error;
    }
  }

  /**
   * Find a MetaObject by ID.
   * @param {Object} params - Parameters for finding the MetaObject.
   * @param {Array} params.fieldDefinitions - The field definitions.
   * @param {string} id - The ID of the MetaObject to find.
   * @returns {Promise<Object>} The found MetaObject.
   * @throws {Error} If there's an API error.
   */
  async find({ fieldDefinitions }, id) {
    let fields = fieldDefinitions.map(def => 
      `${def.key}: field(key: "${def.key}") { value }`
    ).join('\n');

    const query = `#graphql
    query {
        metaobject(id: "${id}") {
            id
            handle
            type
            ${fields}
        }
    }`;

    try {
      const response = await this.admin.graphql(query);
      const { data: { metaobject } } = await response.json();

      if (!metaobject) {
        throw new Error(`MetaObject not found with ID: ${id}`);
      }

      let fieldsValue = {};
      for (const def of fieldDefinitions) {
        fieldsValue[def.key] = metaobject[def.key].value;
      }

      return {
        id: metaobject.id,
        handle: metaobject.handle,
        type: metaobject.type.split("--").pop(),
        ...fieldsValue,
      };
    } catch (error) {
      console.error('Error finding MetaObject:', error);
      throw error;
    }
  }

  /**
   * Update a MetaObject.
   * @param {Object} params - Parameters for updating the MetaObject.
   * @param {Array} params.fieldDefinitions - The field definitions.
   * @param {string} id - The ID of the MetaObject to update.
   * @param {Object} data - The updated data for the MetaObject fields.
   * @returns {Promise<Object>} The updated MetaObject.
   * @throws {Error} If there's an API error.
   */
  async update({ fieldDefinitions }, id, data) {
    const fields = fieldDefinitions.map((def) => ({
      key: def.key,
      value: data[def.key],
    }));

    const mutation = `#graphql
    mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
        metaobjectUpdate(id: $id, metaobject: $metaobject) {
            metaobject {
                id
                handle
                type
            }
            userErrors {
                field
                message
                code
            }
        }
    }`;

    try {
      const response = await this.admin.graphql(mutation, { 
        variables: { id, metaobject: { fields } } 
      });
      const { data: { metaobjectUpdate: { metaobject, userErrors } } } = await response.json();

      if (userErrors.length > 0) {
        throw new Error(userErrors.map(e => e.message).join(', '));
      }

      return metaobject;
    } catch (error) {
      console.error('Error updating MetaObject:', error);
      throw error;
    }
  }

  /**
   * List MetaObjects with pagination.
   * @param {Object} params - Parameters for listing MetaObjects.
   * @param {string} params.type - The type of MetaObjects to list.
   * @param {Array} params.fieldDefinitions - The field definitions.
   * @param {number} [limit=50] - The number of items to return.
   * @param {string} [cursor] - The cursor for pagination.
   * @returns {Promise<Object>} The list of MetaObjects and pagination info.
   * @throws {Error} If there's an API error.
   */
  async list({ type, fieldDefinitions }, limit = 50, cursor = null) {
    let fields = fieldDefinitions.map(def => 
      `${def.key}: field(key: "${def.key}") { value }`
    ).join('\n');

    let cursorParam = cursor ? `, after: "${cursor}"` : '';
    const query = `#graphql
    query {
        metaobjects(type: "${type}", first: ${limit}${cursorParam}) {
            nodes {
                id
                handle
                type
                ${fields}
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }`;

    try {
      const response = await this.admin.graphql(query);
      const { data: { metaobjects: { nodes, pageInfo } } } = await response.json();

      const formattedNodes = nodes.map(node => {
        let fieldsValue = {};
        for (const def of fieldDefinitions) {
          fieldsValue[def.key] = node[def.key].value;
        }
        return {
          id: node.id,
          handle: node.handle,
          type: node.type.split("--").pop(),
          ...fieldsValue,
        };
      });

      return { nodes: formattedNodes, pageInfo };
    } catch (error) {
      console.error('Error listing MetaObjects:', error);
      throw error;
    }
  }

  /**
   * Delete a MetaObject.
   * @param {string} id - The ID of the MetaObject to delete.
   * @returns {Promise<string>} The ID of the deleted MetaObject.
   * @throws {Error} If there's an API error.
   */
  async delete(id) {
    const mutation = `#graphql
    mutation metaobjectDelete($id: ID!) {
        metaobjectDelete(id: $id) {
            deletedId
            userErrors {
                field
                message
            }
        }
    }`;

    try {
      const response = await this.admin.graphql(mutation, { variables: { id } });
      const { data: { metaobjectDelete: { deletedId, userErrors } } } = await response.json();

      if (userErrors.length > 0) {
        throw new Error(userErrors.map(e => e.message).join(', '));
      }

      return deletedId;
    } catch (error) {
      console.error('Error deleting MetaObject:', error);
      throw error;
    }
  }
}