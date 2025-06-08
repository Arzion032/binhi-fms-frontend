// API functions for inventory management
import { BASE_URL } from '../api';

// Fetch all inventory items
export const fetchInventoryItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/inventory/`);
    if (!response.ok) {
      throw new Error('Failed to fetch inventory items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    throw error;
  }
};

// Add new inventory item
export const addInventoryItem = async (itemData) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/add_item/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...itemData,
        quantity: 1,
        available: 1,
        rented: 0
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add inventory item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding inventory item:', error);
    throw error;
  }
};

// Update inventory item status
export const updateItemStatus = async (itemId, status) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/update_item/${itemId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update item status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating item status:', error);
    throw error;
  }
};

// Delete inventory item
export const deleteInventoryItem = async (itemId) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/delete_item/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: itemId }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete inventory item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
};

// Rent an item
export const rentItem = async (rentalData) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/rent_item/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rentalData),
    });
    if (!response.ok) {
      throw new Error('Failed to rent item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error renting item:', error);
    throw error;
  }
};

// Return a rented item
export const returnItem = async (rentalId) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/return_item/${rentalId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to return item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error returning item:', error);
    throw error;
  }
}; 