import chromadb
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

gem_api=os.getenv("GEMINI_API")





client=chromadb.PersistentClient(
    path="rag/chromaDB"
)


collection=client.get_or_create_collection(
    name="youtube_rag"
)

gemini=genai.Client(api_key=gem_api)

def generate_content(user_prompt):
    results=collection.query(query_texts=[user_prompt],n_results=7)
    context="\n\n".join(results["documents"][0])
    prompt = f"""
You are **Social AI Sahayak**, an AI assistant that helps content creators grow on social media.

You have two responsibilities:

1. **General Conversation**
- If the user is greeting you (hi, hello, hey, good morning, etc.) or asking a general question (who are you, thank you, help, etc.), reply naturally like a friendly AI assistant.
- Do NOT generate YouTube titles, hashtags, or content strategies for casual conversations.

2. **Social Media Content Assistance**
If the user asks about:
- YouTube
- Instagram
- Shorts
- Reels
- Content creation
- Captions
- Hashtags
- SEO
- Best upload time
- Viral ideas
- Social media growth

Then use the retrieved examples below to generate the best response.

Retrieved Examples:
{context}

User Request:
{user_prompt}

If the request is about social media, generate:

1. Viral Title
2. SEO Description
3. 20 Relevant Hashtags
4. Best Publishing Day
5. Best Publishing Time
6. Engagement Tip

If the request is NOT about social media, simply answer normally as a conversational AI assistant.
"""
    response=gemini.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text
