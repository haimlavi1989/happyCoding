# **Guide to Effective Prompt Engineering**

## **🔹 Key Strategies for Improving Prompts**

### **1️⃣ Providing Clear and Precise Instructions**
To get high-quality responses, use the following strategies:
✔ **Detailed Prompting** – Provide comprehensive and clear instructions.  
✔ **Role Prompting** – Ask the model to act in a specific role (e.g., "You are a financial analyst...").  
✔ **Providing Examples** – Show examples of the desired output.  
✔ **Defining Response Length** – Specify whether the response should be short, medium, or detailed.  
✔ **Reinforcing Key Instructions at the End** – Helps prevent errors from the model.  
✔ **Using Delimiters** – Mark different sections in the prompt (e.g., with `###`).  
✔ **Handling Special Cases** – Define how to deal with missing information or contradictions.  
✔ **Requesting Structured Output** – Ask the model to return JSON, tables, or structured lists.  

---

### **2️⃣ Allow the Model "Time to Think"**
To improve response quality, use techniques such as:

🧩 **Chain of Thought** – Ask the model to explain its reasoning step by step.  
📝 **Explicit Prompting** – "Answer in a step-by-step manner."  
🔄 **Few-Shot Learning** – Provide multiple examples before asking the question.  

---

### **3️⃣ Systematic Prompt Development (Iterative Prompting)**
✅ **Initial Testing** – Try different prompts on various examples.  
✅ **Analyze Results** – Identify what worked well and what didn’t.  
✅ **Refine Instructions** – Add clarifications and improve structure.  
✅ **Repeat the Process** – Iteratively improve until achieving optimal results.  

---

## **🎯 Example of an Advanced Prompt**
```python
import json
from anthropic import Anthropic

# Initialize the AI client
anthropic_client = Anthropic()

# Sample input data (replace with actual input)
news_text = """
Example news article content goes here. It should be a real-world business-related article.
"""

model_results = {
    "sentiment": "Neutral",
    "key_entities": ["Company A", "Industry B"],
    "summary": "Regulatory changes affecting the market."
}

# Construct the AI prompt
prompt = f"""
## Business Insights Analysis from News Article

### News Article
{news_text}

### Preliminary Model Analysis
{json.dumps(model_results, indent=2)}

### Your Task
Please extract significant business insights from this news article. Address the following five categories:
1. **Potential stock market impacts**
2. **Competitive implications**
3. **Business opportunities**
4. **Potential risks**
5. **Relevant market trends**

---

## 📌 Guidelines for Response:
- **Each key must contain at least 3-5 relevant insights**.
- **Each insight should include a brief explanation (1-3 sentences)**.
- **Total response length: 400-600 words**.
- **Clearly distinguish between short-term and long-term effects**.
- **Indicate the level of certainty** (`low/medium/high`).
- **If global implications are relevant, include them**.
- **Strictly avoid political interpretations – focus only on business aspects**.

---

## 📌 Special Cases:
- If **insufficient information** exists, return `{{ "insufficient_data": true }}`.
- If there are **contradictory insights**, explain both and estimate likelihood.
- If the article discusses a **financial crisis**, include `"crisis_response_strategy"` key.
- If it’s about a **specific company**, provide `"company_specific_analysis"` with in-depth insights.

---

## 📌 Important Guidelines:
✅ Base insights **only** on the article and model analysis.  
✅ **Distinguish short-term vs. long-term effects**.  
✅ Indicate **certainty level (low/medium/high)**.  
✅ Consider **global implications**.  
✅ **Avoid political bias** – focus on business aspects.

### Example of Desired Response
{{
  "market_impact": [
    {{
      "impact": "Expected 3-5% decline in sector company stocks",
      "reasoning": "The regulatory change announcement creates uncertainty",
      "timeframe": "Short-term (1-3 months)",
      "confidence": "High"
    }},
    {{
      "impact": "Possible recovery in the medium term",
      "reasoning": "Companies will adapt to new requirements",
      "timeframe": "Medium (6-12 months)",
      "confidence": "Medium"
    }}
  ],
  "competitive_implications": [
    "Advantage for larger players with resources for quick adaptation",
    "Higher entry barriers for new players",
    "Opportunity for technology companies to provide compliance solutions"
  ]
}}

# Call the AI model
message = anthropic_client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=2000,
    temperature=0.1,
    system="""
    You are an expert business analyst specializing in extracting business insights from news articles.
    You have 15 years of experience analyzing macroeconomic implications of news events.
    You can identify patterns and business implications that aren't immediately obvious.
    Your insights should be deep, data-driven, and geared toward business decision-making.
    """,
    messages=[
        {"role": "user", "content": prompt}
    ]
)

# Print the response
print(message)
```





