export const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) {
    return err.message
  } else {
    return 'Unknown error occured.'
  }
}
