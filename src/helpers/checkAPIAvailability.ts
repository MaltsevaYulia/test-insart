export const checkAPIAvailability = async () => {
  try {
    const response = await fetch(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4"
    );

    if (response.ok) {
      console.log("API is available");
      return true;
    } else {
      console.log("API is not available");
      return false;
    }
  } catch (error) {
    console.error("Error checking API availability:", error);
    return false;
  }
};
