interface User {
    id: number;
    name: string;
    role: string;
  }
  
  // Custom deserialization function
  function deserializeUser(data: string): User {
    // Simulate custom deserialization
    let parsedData: any;
  
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      throw new Error("Invalid JSON format");
    }
  
    // Custom logic that might 
    if (typeof parsedData.role === 'string') {
      parsedData.role = parsedData.role.toLowerCase();
    }
  
    // Additional custom validation
    if (parsedData.role === 'admin') {
      parsedData.role = 'user'; // Prevent elevation to admin, but insecurely handled
    }
  
    return parsedData as User;
  }
  
  // Example usage with untrusted data
  const rawData = '{"id":1,"name":"Alice","role":"admin"}';
  const user = deserializeUser(rawData);
  
  console.log(user);
  