import EncryptedStorage from 'react-native-encrypted-storage'

/**
 * Stores the JWT token securely.
 * @param token - The token to store.
 */
export const storeToken = async (token: string): Promise<void> => {
  try {
    await EncryptedStorage.setItem('userToken', token)
  } catch (error) {
    console.error('Error storing token:', error)
    throw new Error('Failed to store token.')
  }
}

/**
 * Retrieves the stored JWT token.
 * @returns The token, or null if it doesn't exist.
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await EncryptedStorage.getItem('userToken')
  } catch (error) {
    console.error('Error retrieving token:', error)
    return null
  }
}

/**
 * Deletes the stored JWT token.
 */
export const deleteToken = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem('userToken')
  } catch (error) {
    console.error('Error deleting token:', error)
    throw new Error('Failed to delete token.')
  }
}

/**
 * Validates the token with the backend (optional).
 * @param token - The token to validate.
 * @param backendUrl - The backend validation endpoint.
 * @returns The user data if the token is valid.
 */
export const validateToken = async (token: string, backendUrl: string): Promise<any> => {
  try {
    const response = await fetch(`${backendUrl}/login/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Token validation failed')
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error('Error validating token:', error)
    return null
  }
}
