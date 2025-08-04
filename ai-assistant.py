import openai
import os

# Make sure your OpenAI API key is set as an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_assistant(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an AI web development assistant helping build a search engine."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=1000
    )
    return response.choices[0].message["content"].strip()

while True:
    user_input = input("\n💬 Ask the AI assistant: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    print("\n🤖 Response:\n")
    print(ask_assistant(user_input))
