export class Discount {
    constructor(admin) {  
      this.admin = admin;
    }
  
    async createAutomatic({
      title,
      functionId,
      startsAt = new Date(),
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {
          discountCreate: discountAutomaticAppCreate(automaticAppDiscount: $discount) {
            automaticAppDiscount {
              discountId
            }
            userErrors {
              code
              message
              field
            }
          }
        }`;
  
      const variables = {
        discount: {
          title,
          functionId,
          combinesWith,
          startsAt,
          endsAt,
          metafields
        },
      };
  
      try {
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountCreate } } = await response.json();
  
        if (discountCreate.userErrors && discountCreate.userErrors.length > 0) {
          const errorMessages = discountCreate.userErrors.map(error => `${error.message} (Field: ${error.field}, Code: ${error.code})`);
          throw new Error(`Failed to create discount: ${errorMessages.join(', ')}`);
        }
  
        return discountCreate.automaticAppDiscount;
      } catch (error) {
        console.error('Error creating automatic discount:', error);
        throw error;
      }
    }
  
    async updateAutomatic({
      id,
      title,
      startsAt,
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation discountAutomaticAppUpdate($automaticAppDiscount: DiscountAutomaticAppInput!, $id: ID!) {
          discountAutomaticAppUpdate(automaticAppDiscount: $automaticAppDiscount, id: $id) {
            automaticAppDiscount {
              discountId
              title
              startsAt
              endsAt
              status
              appDiscountType {
                appKey
                functionId
              }
              combinesWith {
                orderDiscounts
                productDiscounts
                shippingDiscounts
              }
            }
            userErrors {
              code
              field
              message
            }
          }
        }`;
  
      const variables = {
        id,
        automaticAppDiscount: {
          title,
          combinesWith,
          startsAt,
          endsAt,
          metafields
        }
      };
  
      try {
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountAutomaticAppUpdate } } = await response.json();
  
        if (discountAutomaticAppUpdate.userErrors && discountAutomaticAppUpdate.userErrors.length > 0) {
          const errorMessages = discountAutomaticAppUpdate.userErrors.map(error => `${error.message} (Field: ${error.field}, Code: ${error.code})`);
          throw new Error(`Failed to update automatic discount: ${errorMessages.join(', ')}`);
        }
  
        return discountAutomaticAppUpdate.automaticAppDiscount;
      } catch (error) {
        console.error('Error updating automatic discount:', error);
        throw error;
      }
      
    }
  
    async deactivateAutomatic(automaticDiscountId) {
      const mutation = `#graphql
        mutation discountAutomaticDeactivate($id: ID!) {
          discountAutomaticDeactivate(id: $id) {
            automaticDiscountNode {
              automaticDiscount {
                ... on DiscountAutomaticBxgy {
                  status
                  startsAt
                  endsAt
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: automaticDiscountId };
      try {
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountAutomaticActivate } } = await response.json();
  
        if (discountAutomaticActivate.userErrors && discountAutomaticActivate.userErrors.length > 0) {
          const errorMessages = discountAutomaticActivate.userErrors.map(error => `${error.message} (Field: ${error.field})`);
          throw new Error(`Failed to activate automatic discount: ${errorMessages.join(', ')}`);
        }
  
        return discountAutomaticActivate.automaticDiscountNode;
      } catch (error) {
        console.error('Error activating automatic discount:', error);
        throw error;
      }
    }
  
    async activateAutomatic(automaticDiscountId) {
      const mutation = `#graphql
        mutation discountAutomaticActivate($id: ID!) {
          discountAutomaticActivate(id: $id) {
            automaticDiscountNode {
              automaticDiscount {
                ... on DiscountAutomaticBxgy {
                  status
                  startsAt
                  endsAt
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: automaticDiscountId };
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountAutomaticActivate } } = await response.json();
      return discountAutomaticActivate;
    }
  
    async deleteAutomatic(automaticDiscountId) {
      const mutation = `#graphql
        mutation discountAutomaticDelete($id: ID!) {
          discountAutomaticDelete(id: $id) {
            deletedAutomaticDiscountId
            userErrors {
              field
              code
              message
            }
          }
        }`;
  
      const variables = { id: automaticDiscountId };

      try {
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountAutomaticDelete } } = await response.json();
  
        if (discountAutomaticDelete.userErrors && discountAutomaticDelete.userErrors.length > 0) {
          const errorMessages = discountAutomaticDelete.userErrors.map(error => `${error.message} (Field: ${error.field}, Code: ${error.code})`);
          throw new Error(`Failed to delete automatic discount: ${errorMessages.join(', ')}`);
        }
  
        return discountAutomaticDelete.deletedAutomaticDiscountId;
      } catch (error) {
        console.error('Error deleting automatic discount:', error);
        throw error;
      }
    }
  
    async queryAutomaticDiscounts() {
      const query = `#graphql
        {
          discountNodes(first: 10) {
            edges {
              node {
                id
                discount {
                  __typename
                  ... on DiscountAutomaticApp {
                    status
                    title
                  }
                }
              }
            }
          }
        }`;
  
      try {
        const response = await this.admin.graphql(query);
        const { data: { discountNodes: { edges } } } = await response.json();
        return edges;
      } catch (error) {
        console.error('Error querying automatic discounts:', error);
        throw error;
      }
    }
  
    async setAutomaticMetafields(discountId, data) {
      const mutation = `#graphql
        mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields {
              key
              namespace
              value
              createdAt
              updatedAt
            }
            userErrors {
              field
              message
              code
            }
          }
        }`;
  
      const variables = {
        metafields: [
          {
            key: "function-configuration",
            namespace: "discount",
            ownerId: discountId,
            value: JSON.stringify(data),
            type: "json"
          }
        ]
      };
  
      try {
        const response = await this.admin.graphql(mutation, { variables });
        return await response.json();
      } catch (error) {
        console.error('Error setting automatic discount metafields:', error);
        throw error;
      }

    }
  
    async getAutomaticWithMetafield(id, metafieldKey, metafieldNamespace) {
      const query = `#graphql
        query {
          automaticDiscountNode(id: "${id}") {
            id
            metafield(key: "${metafieldKey}", namespace: "${metafieldNamespace}") {
              id
              value
            }
          }
        }`;
  
        try {
          const response = await this.admin.graphql(query);
          const { data: { automaticDiscountNode } } = await response.json();
          return automaticDiscountNode;
        } catch (error) {
          console.error('Error getting automatic discount with metafield:', error);
          throw error;
        }
    }
  
    async createCode({
      appliesOncePerCustomer,
      title,
      code,
      usageLimit,
      functionId,
      startsAt = new Date(),
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation discountCodeAppCreate($codeAppDiscount: DiscountCodeAppInput!) {
          discountCreate: discountCodeAppCreate(codeAppDiscount: $codeAppDiscount) {
            codeAppDiscount {
              discountId
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = {
        codeAppDiscount: {
          title,
          functionId,
          combinesWith,
          startsAt,
          endsAt,
          metafields,
          appliesOncePerCustomer,
          code,
          usageLimit
        },
      };
  
      try {
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountCreate } } = await response.json();
        return discountCreate;
      } catch (error) {
        console.error('Error creating discount code:', error);
        throw error;
      }

    }
  
    async getCodeWithMetafield(id, metafieldKey, metafieldNamespace) {
      const query = `#graphql
        query {
          codeDiscountNode(id: "${id}") {
            id
            metafield(key: "${metafieldKey}", namespace: "${metafieldNamespace}") {
              id
              value
            }
          }
        }`;
  
      try {
        const response = await this.admin.graphql(query);
        const { data: { codeDiscountNode } } = await response.json();
        return codeDiscountNode;
      } catch (error) {
        console.error('Error getting discount code with metafield:', error);
        throw error;
      }
    }
  
    async updateCode({
      id,
      title,
      appliesOncePerCustomer,
      code,
      usageLimit,
      startsAt,
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation discountCodeAppUpdate($codeAppDiscount: DiscountCodeAppInput!, $id: ID!) {
          discountCodeAppUpdate(codeAppDiscount: $codeAppDiscount, id: $id) {
            codeAppDiscount {
              discountId
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = {
        id,
        codeAppDiscount: {
          title,
          combinesWith,
          startsAt,
          endsAt,
          metafields,
          appliesOncePerCustomer,
          code,
          usageLimit
        }
      };
  
      try {
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountCodeAppUpdate } } = await response.json();
        return discountCodeAppUpdate;
      } catch (error) {
        console.error('Error updating discount code:', error);
        throw error;
      }

    }
  
    async deleteCode(discountId) {
      const mutation = `#graphql
        mutation discountCodeDelete($id: ID!) {
          discountCodeDelete(id: $id) {
            deletedCodeDiscountId
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: discountId };
      
      try{
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountCodeDelete } } = await response.json();
        return discountCodeDelete;
      } catch (error) {
        console.error('Error deleting discount code:', error);
        throw error;
      }

    }
  
    async deactivateCode(discountId) {
      const mutation = `#graphql
        mutation discountCodeDeactivate($id: ID!) {
          discountCodeDeactivate(id: $id) {
            codeDiscountNode {
              id
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: discountId };
      try {
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountAutomaticDeactivate } } = await response.json();
  
        if (discountAutomaticDeactivate.userErrors && discountAutomaticDeactivate.userErrors.length > 0) {
          const errorMessages = discountAutomaticDeactivate.userErrors.map(error => `${error.message} (Field: ${error.field})`);
          throw new Error(`Failed to deactivate automatic discount: ${errorMessages.join(', ')}`);
        }
  
        return discountAutomaticDeactivate.automaticDiscountNode;
      } catch (error) {
        console.error('Error deactivating automatic discount:', error);
        throw error;
      }
    }
  
    async activateCode(discountId) {
      const mutation = `#graphql
        mutation discountCodeActivate($id: ID!) {
          discountCodeActivate(id: $id) {
            codeDiscountNode {
              id
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: discountId };

      try{
        const response = await this.admin.graphql(mutation, { variables });
        const { data: { discountCodeActivate } } = await response.json();
        return discountCodeActivate;
      } catch (error) {
        console.error('Error activating discount code:', error);
        throw error;
      }

    }
  
  }