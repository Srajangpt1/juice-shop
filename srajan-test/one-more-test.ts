type JsonPrimitive = string | number | boolean | null;

type JsonObject = { [key: string]: JsonValue };

type JsonArray = JsonValue[];

type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// Recursive type to deeply make all properties optional
type DeepPartial<T> = T extends JsonPrimitive
  ? T
  : T extends JsonArray
  ? DeepPartial<T[number]>[]
  : T extends JsonObject
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : never;

// Example JSON-like structure
type User = {
  id: number;
  name: string;
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
  };
  friends: { name: string; id: number }[];
};

// Function that manipulates deeply partial types
function updateUserProfile(userId: number, profileUpdates: DeepPartial<User>) {
  if (profileUpdates.id) {
    console.log(`Updating ID for user ${userId} to ${profileUpdates.id}`);
    // An attacker could try to set an invalid type for `id` leading to potential issues.
  }

  if (profileUpdates.preferences?.theme) {
    console.log(`Updating theme for user ${userId} to ${profileUpdates.preferences.theme}`);
    // CodeQL might not catch that `theme` could be set to an invalid value
  }

  if (profileUpdates.friends) {
    console.log(`Updating friends for user ${userId}`);
    profileUpdates.friends.forEach(friend => {
      console.log(`Friend: ${friend.name}, ID: ${friend.id}`);
    });
  }
}

// Example of an unsafe call that might not be detected by CodeQL
const unsafeUpdate = {
  id: '123', 
  preferences: {
    theme: 'midnight',
  },
  friends: [
    { name: 'Alice', id: 'invalid-id' }
  ]
};

// This would compile, but could lead to runtime errors or unexpected behavior
updateUserProfile(1, unsafeUpdate as DeepPartial<User>);
