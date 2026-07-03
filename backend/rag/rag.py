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
    prompt=f"""
you are the growth expert. 
User Request:
{user_prompt}
Retrived Similar videos:
{context}
Analyze patterns from retrived videos.
Generate:
1.Viral Youtube title
2.SEO Description
3.10 Hashtags
4.Best Publishing Time
5.Best publishing Day
6.Engagement Tip
Return in clean structured format.
"""
    response=gemini.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text
