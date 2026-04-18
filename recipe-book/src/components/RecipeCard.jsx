

function RecipeCard({
  recipe,
  onEdit,
  onDelete,
  onAddIngredientToGroceries,
  showIngredients = true,
  showInstructions = true,
}) {
  return (
    <li className="recipe-card">
      <h4>{recipe.recipeName}</h4>

      {showIngredients && (
        <>
          <p>
            <strong>Ingredients:</strong>
          </p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}
                {onAddIngredientToGroceries && (
                  <button onClick={() => onAddIngredientToGroceries(ingredient)}>
                    Add
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {showInstructions && (
        <>
          <p>
            <strong>Instructions:</strong>
          </p>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </>
      )}

      <div className="recipe-card-actions">
        {onEdit && <button onClick={() => onEdit(recipe)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(recipe.id)}>Delete</button>}
      </div>
    </li>
  );
}

export default RecipeCard;
