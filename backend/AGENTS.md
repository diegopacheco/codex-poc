# AGENTS.md

- Format all Go code with gofmt.

- Run gofmt and ensure `go test ./...` passes before submitting code.

- Follow good and modern Go engineering practices:
  Avoid creating global variables
  Avoid adding unnecessary dependencies, be minimalistic add only add dependencies that are strictly necessary for the task.
  Use meaningful names for functions, variables, and packages

- When you open a PR in github make sure you:
  Make sure you run the tests before committing your code and fix all errors.
  Add the Prompt used on this task. (Prompt section)
  Print the test outout in the PR description. Test Output (section)