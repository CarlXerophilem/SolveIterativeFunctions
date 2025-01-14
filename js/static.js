document.getElementById("composita-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const maxDegree = document.getElementById("max-degree").value;
    const f1 = document.getElementById("f1").value;
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;

    fetch("/solve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            max_degree: maxDegree,
            f1: f1,
            a: a,
            b: b,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("coefficients").textContent = JSON.stringify(data.coefficients, null, 2);
            document.getElementById("plot").src = "data:image/png;base64," + data.plot;
        })
        .catch((error) => console.error("Error:", error));
});
