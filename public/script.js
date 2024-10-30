document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("grocery-form");
  const table = document.getElementById("grocery-table");
  let groceryItems = [];
  let editingItemId = null;

  function renderGroceryList() {
      const tbody = table.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";

      groceryItems.forEach(function(item) {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>${item.category}</td>
              <td>
                  <button class="edit" data-id="${item.id}">Edit</button>
                  <button class="delete" data-id="${item.id}">Delete</button>
              </td>
          `;
          tbody.appendChild(row);
      });

      attachEventListeners();
  }

  function attachEventListeners() {
      const editButtons = document.querySelectorAll("button.edit");
      const deleteButtons = document.querySelectorAll("button.delete");

      editButtons.forEach(function(button) {
          button.addEventListener("click", handleEditClick);
      });

      deleteButtons.forEach(function(button) {
          button.addEventListener("click", handleDeleteClick);
      });
  }

  function handleEditClick(event) {
      const itemId = event.target.dataset.id;
      const item = groceryItems.find(function(i) {
          return i.id === parseInt(itemId);
      });

      document.getElementById("item-name").value = item.name;
      document.getElementById("item-quantity").value = item.quantity;
      document.getElementById("item-category").value = item.category;
      editingItemId = item.id;
  }

  function handleDeleteClick(event) {
      const itemId = event.target.dataset.id;
      groceryItems = groceryItems.filter(function(item) {
          return item.id !== parseInt(itemId);
      });
      renderGroceryList();
  }

  function addGroceryItem(item) {
      item.id = groceryItems.length > 0 ? Math.max(...groceryItems.map(i => i.id)) + 1 : 1;
      groceryItems.push(item);
      renderGroceryList();
  }

  function updateGroceryItem(id, updatedItem) {
      groceryItems = groceryItems.map(function(item) {
          if (item.id === id) {
              return updatedItem;
          }
          return item;
      });
      renderGroceryList();
  }

  form.addEventListener("submit", function(event) {
      event.preventDefault();

      const itemName = document.getElementById("item-name").value;
      const itemQuantity = document.getElementById("item-quantity").value;
      const itemCategory = document.getElementById("item-category").value;

      const item = {
          name: itemName,
          quantity: itemQuantity,
          category: itemCategory
      };

      if (editingItemId !== null) {
          updateGroceryItem(editingItemId, item);
          editingItemId = null;
      } else {
          addGroceryItem(item);
      }

      form.reset();
  });
});