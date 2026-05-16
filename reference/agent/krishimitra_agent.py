"""
CrewAI + LangChain agent skeleton — KrishiMitra advisory agent.
"""
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

field_analyst = Agent(
    role="Field Intelligence Analyst",
    goal="Interpret telemetry and rank regions by priority.",
    backstory="Veteran agronomist fluent in pest cycles and crop physiology.",
    llm=llm,
)

advisor = Agent(
    role="Farmer Advisor",
    goal="Translate recommendations into clear actions in EN / TE / HI.",
    backstory="Multilingual extension officer.",
    llm=llm,
)

def run(query: str):
    analysis = Task(description=f"Analyze: {query}", agent=field_analyst, expected_output="Structured risk + action.")
    advisory = Task(description="Render the analysis as a farmer-ready advisory.", agent=advisor, expected_output="3-language advisory.")
    return Crew(agents=[field_analyst, advisor], tasks=[analysis, advisory]).kickoff()

if __name__ == "__main__":
    print(run("Guntur chilli, humidity 86%, thrips outbreak active."))
