import { BlockStack, Box, Button, Card, InlineStack, Select, Text, TextField, Thumbnail } from "@shopify/polaris";
import {
  UndoIcon,
  ImageIcon,
} from '@shopify/polaris-icons'

export default function ProductSelectionCard ({
  title,
  subtitle = '',
  products,
  setProducts,
  type = 'product',
  multiple = false,
  action = 'select',
  filterVariant = true,
  children = null,
  handleQuantity = false
}) {

  const handleVariantSelection = async () => {
    const selectedProducts = await shopify.resourcePicker({
      type: type,
      selectionIds: products,
      multiple: multiple,
      action: action,
      filter: {
        variants: filterVariant
      }
    });
    if (selectedProducts === undefined) return

    const normalizedProducts = selectedProducts.map(product => {
      let variants;
      if (filterVariant) {
        variants = product.variants?.map(variant => ({
          id: variant.id,
          availableForSale: variant.availableForSale,
          displayName: variant.displayName,
          image: variant?.image,
          inventoryQuantity: variant?.inventoryQuantity,
          price: variant?.price,
          title: variant?.title,
        }));
      } else {
        const firstAvailableVariant = product.variants?.find(variant => variant.availableForSale);
        variants = firstAvailableVariant ? [{
          id: firstAvailableVariant.id,
          availableForSale: firstAvailableVariant.availableForSale,
          displayName: firstAvailableVariant.displayName,
          image: firstAvailableVariant?.image,
          inventoryQuantity: firstAvailableVariant?.inventoryQuantity,
          price: firstAvailableVariant?.price,
          title: firstAvailableVariant?.title,
        }] : [];
      }
    
      return {
        id: product.id,
        title: product.title,
        hasOnlyDefaultVariant: product.hasOnlyDefaultVariant,
        handle: product.handle,
        images: product.images,
        quantity: 1,
        status: product.status,
        totalInventory: product.totalInventory,
        variants: variants,
      };
    });
    setProducts(normalizedProducts);

  }

  return (
    <Card paddingBlockStart="200" paddingBlockEnd="200">
      <BlockStack gap="200">
        <Text variant="headingSm">{title}</Text>
        {subtitle && <Text variant="bodySm">{subtitle} </Text>}
        <InlineStack gap="200" blockAlign="center" align="space-between">
          <Box width="83%">
            <Select label="Criteria"
              labelHidden
              options={[{ label: 'Specific products', value: null }]}
              onChange={() => { }} />
          </Box>
          <Button onClick={handleVariantSelection}>Browse</Button>
        </InlineStack>
        <BlockStack gap="200">
          {products?.map(product => <Box key={product.id} borderWidth="025" borderStyle="dashed" borderRadius="100" borderColor="border-brand" padding="200">

            <InlineStack gap="200" align="space-between">

              <Box width="75%">
                <InlineStack gap="200" blockAlign="start" align="start">
                  <Box width="15%">
                    <Thumbnail
                      source={product?.images[0] ? product?.images[0].originalSrc : ImageIcon}
                      size='small'
                      alt='product image' />
                  </Box>
                  <Box width="80%">
                    <BlockStack>
                      <Text>{product.title}</Text>
                      <Text variant="bodySm">Product ID: {product?.id?.split('Product/').pop()}</Text>
                      {product.variants?.length > 0 && 
                        <Text variant="bodyXs" tone="subdued">
                          {`${product.variants?.length} variants`}: ({ product.variants?.map(variant => {
                            return variant?.title + ':' + variant?.id?.split('ProductVariant/').pop()
                          }).join(', ') } )
                        </Text>
                      }
                    </BlockStack>
                  </Box>
                </InlineStack>

              </Box>

              <Box width="20%">
                <InlineStack align="space-between" gap="300" wrap={false}>
                  {handleQuantity ? <TextField
                    label="Quantity"
                    labelHidden
                    autoComplete="off"
                    placeholder="Quantity"
                    min={1}
                    type="number"
                    value={product.quantity}
                    onChange={(value) => {
                      product['quantity'] = +value
                      setProducts(JSON.parse(JSON.stringify(products)))
                    }} /> : <Box />}

                  <Button variant="plain" size="slim" icon={UndoIcon} onClick={() => {
                    const temp = products.filter(p => p.id !== product.id)
                    setProducts(temp)
                  }} />
                </InlineStack>
              </Box>
            </InlineStack>
          </Box>)}
        </BlockStack>
        {children}
      </BlockStack>
    </Card>
  );
}