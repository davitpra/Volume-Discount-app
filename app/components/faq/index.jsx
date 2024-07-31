import { 
  Card,
  Tabs,
  TextField,
  BlockStack,
  Collapsible,
  Button,
  Text,
  Layout,
  InlineGrid,
  Box,
  Divider,
  ResourceList,
  ResourceItem,
} from "@shopify/polaris";
import PageLayout from "../shared/pageLayout";
import { PageTitleBar } from "../shared/pageTitleBar";
import { faqData } from "./faqData";
import { useCallback, useState } from "react";


export const FAQ = () => {

  const [selectedTab, setSelectedTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTab(selectedTabIndex),
    []
  );

  const handleSearchChange = useCallback((value) => setSearchValue(value), []);

  const toggleQuestion = useCallback((id) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const categories = ['All', ...[...new Set(faqData?.map(item => item.category) || [])]];

  const tabs = categories.map((category, index) => ({
    id: `category-${index}`,
    content: category,
    accessibilityLabel: `${category} category`,
    panelID: `category-panel-${index}`,
  }));

  const filteredFAQs = (faqData || []).filter(item => 
    (selectedTab === 0 || item.category === categories[selectedTab]) &&
    (item.question.toLowerCase().includes(searchValue.toLowerCase()) || 
     item.answer.toLowerCase().includes(searchValue.toLowerCase()))
  );


  return (
    <PageLayout showBackButton title="FAQ page">
      <PageTitleBar title="FAQ page" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Frequently asked questions
              </Text>
              <Text as="p" variant="bodyMd">
                Find answers to common questions about ShipReady and how it can help you build Shopify apps faster.
              </Text>

              <Text as="h3" variant="headingMd">
                Knowledge base
              </Text>
              <Text as="p" variant="bodyMd">
                Browse our knowledge base to find detailed guides and tutorials on how to use ShipReady to its full potential.
              </Text>

              <Text as="h3" variant="headingMd">
                Contact us by email
              </Text>
              <Text as="p" variant="bodyMd">
                If you wish to write us an email instead please use contact@yourapp.com
              </Text>
            </BlockStack>
          </Box>

          <Card roundedAbove="sm">
            <BlockStack gap="300">

              <TextField
                label="Search FAQs"
                placeholder="Search for a question..."
                value={searchValue}
                onChange={handleSearchChange}
                clearButton
                onClearButtonClick={() => setSearchValue('')}
              />

              <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>

                <ResourceList
                  resourceName={{singular: 'blog post', plural: 'blog posts'}}
                  items={filteredFAQs}
                  renderItem={(item, index) => {
                    const { question, category } = item;
                    const questionId = `question-${category}-${index}`;
                    return (
                      <ResourceItem 
                        id={questionId} 
                        onClick={() => toggleQuestion(questionId)}
                        accessibilityLabel={`View details for ${question}`}>
                        <Text fontWeight="semibold">{question}</Text>

                        <Collapsible open={expandedQuestions[questionId]} id={questionId}>
                          <Box paddingBlock="300">
                            { item.answer }
                          </Box>
                        </Collapsible>

                      </ResourceItem>
                    );
                  }}
                />

              </Tabs>

            </BlockStack>


          </Card>
        </InlineGrid>

      </BlockStack>


    </PageLayout>
  );
};
