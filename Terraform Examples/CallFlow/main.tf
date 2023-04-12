terraform {
  required_providers {
    twilio = {
      source  = "twilio/twilio"
      version = ">=0.18.18"
    }
  }
}

provider "twilio" {
  account_sid = var.credentials.account_sid
  username    = var.credentials.username
  password    = var.credentials.password
}

variable "credentials" {
  type = object({
    account_sid = string
    username    = string
    password    = string
  })
}
variable "studio_base" {
  type = object({
    friendly_name  = string
    commit_message = string
  })
  sensitive = false
}

resource "twilio_studio_flows_v2" "flow" {

  commit_message = var.studio_base.commit_message
  friendly_name  = var.studio_base.friendly_name
  status         = "published"
  definition     = jsonencode({
    "description": "${var.studio_base.friendly_name}",
    "states": [
        {
            "name": "Trigger",
            "type": "trigger",
            "transitions": [
                {
                    "event": "incomingMessage"
                },
                {
                    "event": "incomingCall"
                },
                {
                    "event": "incomingConversationMessage"
                },
                {
                    "event": "incomingRequest"
                },
                {
                    "event": "incomingParent"
                }
            ],
            "properties": {
                "offset": {
                    "x": 0,
                    "y": 0
                }
            }
        }
    ],
    "initial_state": "Trigger",
    "flags": {
        "allow_concurrent_calls": true
    }
})
}

output "flow_webhook" {
  value = "https://webhooks.twilio.com/v1/Accounts/${var.credentials.account_sid}/Flows/${twilio_studio_flows_v2.flow.sid}"
}
