terraform {
  required_providers {
    twilio = {
      source  = "twilio/twilio"
      version = ">=0.18.15"
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
  sensitive = false
}

variable "workspaceSid" {
  type      = string
  sensitive = false
}

variable "serverless_base" {
  type = object({
    serviceSid     = string
    environmentSid = string
  })
  sensitive = false
}

variable "site_base" {
  type = object({
    serviceSid     = string
    environmentSid = string
  })
  sensitive = false
}

variable "sync" {
  type = object({
    HoursName           = string
    ServiceHoursCountry = string

  })
  sensitive = false
}

variable "taskrouter_queues" {
  type = object({
    Voice_Channel  = string
    Chat_Channel   = string
    SMS_Channel    = string
    Everyone_Queue = string
    InboundQ1Name  = string
    InboundQ2Name  = string
    InboundQ3Name  = string
    InboundQ4Name  = string
    InboundQ5Name  = string
    InboundQ6Name  = string
    InboundQ7Name  = string
  })
  sensitive = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "On_a_Call" {
  workspace_sid = var.workspaceSid
  friendly_name = "On a Call"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "Away" {
  workspace_sid = var.workspaceSid
  friendly_name = "Away"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "Training" {
  workspace_sid = var.workspaceSid
  friendly_name = "In Training"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "KnowledgeCheck" {
  workspace_sid = var.workspaceSid
  friendly_name = "Knowledge Check"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "Meeting" {
  workspace_sid = var.workspaceSid
  friendly_name = "In Team Meeting"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "Coaching" {
  workspace_sid = var.workspaceSid
  friendly_name = "Coaching"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "DisputesRevisit" {
  workspace_sid = var.workspaceSid
  friendly_name = "Disputes Revisit"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "PersonalBioBreak" {
  workspace_sid = var.workspaceSid
  friendly_name = "Personal Bio Break"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "Lunch" {
  workspace_sid = var.workspaceSid
  friendly_name = "Lunch"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "stBreak" {
  workspace_sid = var.workspaceSid
  friendly_name = "1st Break"
  available     = false
}

resource "twilio_taskrouter_workspaces_activities_v1" "ndBreak" {
  workspace_sid = var.workspaceSid
  friendly_name = "2nd Break"
  available     = false
}

resource "twilio_taskrouter_workspaces_task_queues_v1" "Nobody" {
  workspace_sid  = var.workspaceSid
  friendly_name  = "Nobody"
  target_workers = "1 == 0"
}

resource "twilio_taskrouter_workspaces_workflows_v1" "Workflow" {
  workspace_sid = var.workspaceSid
  friendly_name = "Nobody"
  configuration = jsonencode({
    task_routing : {
      filters : [
      ],
      "default_filter" : {
        "queue" : twilio_taskrouter_workspaces_task_queues_v1.Nobody.sid
      }
    }
  })
}
resource "twilio_taskrouter_workspaces_task_queues_v1" "InboundQ1" {
  workspace_sid  = var.workspaceSid
  friendly_name  = var.taskrouter_queues.InboundQ1Name
  target_workers = "routing.skills HAS \"${var.taskrouter_queues.InboundQ1Name}\""
}
resource "twilio_taskrouter_workspaces_task_queues_v1" "InboundQ2" {
  workspace_sid  = var.workspaceSid
  friendly_name  = var.taskrouter_queues.InboundQ2Name
  target_workers = "routing.skills HAS \"${var.taskrouter_queues.InboundQ2Name}\""
}
resource "twilio_taskrouter_workspaces_task_queues_v1" "InboundQ3" {
  workspace_sid  = var.workspaceSid
  friendly_name  = var.taskrouter_queues.InboundQ3Name
  target_workers = "routing.skills HAS \"${var.taskrouter_queues.InboundQ3Name}\""
}
resource "twilio_taskrouter_workspaces_task_queues_v1" "InboundQ4" {
  workspace_sid  = var.workspaceSid
  friendly_name  = var.taskrouter_queues.InboundQ4Name
  target_workers = "routing.skills HAS \"${var.taskrouter_queues.InboundQ4Name}\""
}
resource "twilio_taskrouter_workspaces_task_queues_v1" "InboundQ5" {
  workspace_sid  = var.workspaceSid
  friendly_name  = var.taskrouter_queues.InboundQ5Name
  target_workers = "routing.skills HAS \"${var.taskrouter_queues.InboundQ5Name}\""
}
resource "twilio_taskrouter_workspaces_task_queues_v1" "InboundQ6" {
  workspace_sid  = var.workspaceSid
  friendly_name  = var.taskrouter_queues.InboundQ6Name
  target_workers = "routing.skills HAS \"${var.taskrouter_queues.InboundQ6Name}\""
}
resource "twilio_taskrouter_workspaces_task_queues_v1" "InboundQ7" {
  workspace_sid  = var.workspaceSid
  friendly_name  = var.taskrouter_queues.InboundQ7Name
  target_workers = "routing.skills HAS \"${var.taskrouter_queues.InboundQ7Name}\""
}
resource "twilio_taskrouter_workspaces_workflows_v1" "InboundWorkflow" {
  workspace_sid = var.workspaceSid
  friendly_name = "Inbound"
  task_reservation_timeout = 12
  configuration = jsonencode({
    task_routing : {
      filters : [
        {
          filter_friendly_name : "${var.taskrouter_queues.InboundQ1Name} Filter",
          expression : "queue == \"${var.taskrouter_queues.InboundQ1Name}\"",
          targets : [
            {
              queue : twilio_taskrouter_workspaces_task_queues_v1.InboundQ1.sid
            }
          ]
        },
        {
          filter_friendly_name : "${var.taskrouter_queues.InboundQ2Name} Filter",
          expression : "queue == \"${var.taskrouter_queues.InboundQ2Name}\"",
          targets : [
            {
              queue : twilio_taskrouter_workspaces_task_queues_v1.InboundQ2.sid
            }
          ]
        },
        {
          filter_friendly_name : "${var.taskrouter_queues.InboundQ3Name} Filter",
          expression : "queue == \"${var.taskrouter_queues.InboundQ3Name}\"",
          targets : [
            {
              queue : twilio_taskrouter_workspaces_task_queues_v1.InboundQ3.sid
            }
          ]
        },
        {
          filter_friendly_name : "${var.taskrouter_queues.InboundQ4Name} Filter",
          expression : "queue == \"${var.taskrouter_queues.InboundQ4Name}\"",
          targets : [
            {
              queue : twilio_taskrouter_workspaces_task_queues_v1.InboundQ4.sid
            }
          ]
        },
        {
          filter_friendly_name : "${var.taskrouter_queues.InboundQ5Name} Filter",
          expression : "queue == \"${var.taskrouter_queues.InboundQ5Name}\"",
          targets : [
            {
              queue : twilio_taskrouter_workspaces_task_queues_v1.InboundQ5.sid
            }
          ]
        },
        {
          filter_friendly_name : "${var.taskrouter_queues.InboundQ6Name} Filter",
          expression : "queue == \"${var.taskrouter_queues.InboundQ6Name}\"",
          targets : [
            {
              queue : twilio_taskrouter_workspaces_task_queues_v1.InboundQ6.sid
            }
          ]
        },
        {
          filter_friendly_name : "${var.taskrouter_queues.InboundQ7Name} Filter",
          expression : "queue == \"${var.taskrouter_queues.InboundQ7Name}\"",
          targets : [
            {
              queue : twilio_taskrouter_workspaces_task_queues_v1.InboundQ7.sid
            }
          ]
        }
      ]
    }
  })
}
resource "twilio_taskrouter_workspaces_workflows_v1" "TransferWorkflow" {
  workspace_sid = var.workspaceSid
  friendly_name = "Transfer-to-worker"
  task_reservation_timeout = 12
  configuration = jsonencode({
    "task_routing" : {
      "filters" : [
        {
          "filter_friendly_name" : "Worker",
          "expression" : "1==1",
          "targets" : [
            {
              "queue" : "${var.taskrouter_queues.Everyone_Queue}",
              "known_worker_sid" : "task.transferTargetSid"
            }
          ]
        }
      ],
      "default_filter" : {
        "queue" : "${var.taskrouter_queues.Everyone_Queue}"
      }
    }
  })
}
resource "twilio_sync_services_v1" "ServiceHoursSync" {
  friendly_name = var.sync.HoursName
}
resource "twilio_sync_services_maps_v1" "ServiceHoursCountry" {
  service_sid = twilio_sync_services_v1.ServiceHoursSync.sid
  unique_name = var.sync.ServiceHoursCountry
}
resource "twilio_sync_services_maps_items_v1" "ServiceHoursMapItem" {
  service_sid = twilio_sync_services_v1.ServiceHoursSync.sid
  map_sid     = twilio_sync_services_maps_v1.ServiceHoursCountry.sid
  data = jsonencode({
    field1 : "something"
    field2 : {
      field2_1 : "something else"
    }
  })
  key = "HOO"
}


