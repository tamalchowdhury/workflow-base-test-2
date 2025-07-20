import {
  onNewPasswordProvidedEvent,
  WorkflowSettings,
  WorkflowTrigger,
  invalidateFormField,
} from "@kinde/infrastructure"

// The setting for this workflow
export const workflowSettings: WorkflowSettings = {
  id: "onNewPasswordProvided",
  name: "New Password Entered Test 2",
  trigger: WorkflowTrigger.NewPasswordProvided,
  failurePolicy: {
    action: "stop",
  },
  bindings: {
    "kinde.widget": {}, // Required for accessing the UI
  },
}

function customPasswordValidator(password: string) {
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUppercase) {
    return "Password must include at least one uppercase letter."
  }
  if (!hasLowercase) {
    return "Password must include at least one lowercase letter."
  }
  if (!hasNumber) {
    return "Password must include at least one number."
  }
  if (!hasSpecialChar) {
    return "Password must include at least one special character."
  }
  return null // valid password
}

// The workflow code to be executed when the event is triggered
export default async function Workflow(event: onNewPasswordProvidedEvent) {
  const { firstPassword } = event.context.auth
  const invalidMessage = customPasswordValidator(firstPassword)

  if (invalidMessage) {
    // Custom form validation
    invalidateFormField("p_first_password", invalidMessage)
  }
}