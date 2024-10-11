const url = "http://localhost:8080/advice";
const testData = {
  bmi: 22.5,
  age: 25,
  gender: "male",
  height: 175,
  weight: 70,
};

const fetchA = async () => {
  try {
    console.log("Loading...");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

await fetchA();
