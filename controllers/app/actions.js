const { revalidatePath } = require('next/cache');

async function deleteElement(id) {
  // Replace this with your actual deletion logic
  console.log(`Deleting element with id: ${id}`);
  
  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Revalidate the current path to reflect the changes
  revalidatePath('/home');
}

module.exports = { deleteElement };
