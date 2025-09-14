import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=110&skip=0")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recipes");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="center">⏳ Loading recipes...</h2>;
  if (error) return <h2 className="center">{error}</h2>;

  return (
    <div className="app">
      {/* Navbar at the top */}
      <Navbar />

      {/* Recipe grid */}
      <div className="grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt={recipe.name} className="card-img" />
            <div className="card-body">
              <h2>{recipe.name}</h2>
              <p><b>Cuisine:</b> {recipe.cuisine}</p>
              <p><b>Rating:</b> ⭐ {recipe.rating}</p>
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.slice(0, 5).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
