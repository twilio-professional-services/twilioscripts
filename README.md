# TwilioScripts

This Script helps you take a Studio Flow and parameterise it for use with Terrafrom.

## Installation

Clone this repository
run npm install

## Usage

In Twilio Studio, copy your Studio Flow JSON (Click the Studio Flow Trigger and Select Show Flow JSON)
Paste your JSON into a new file in the TwilioScripts directory (e.g. myflow.json)

run the following command:

node.js TerraformFlow.js <<flow-name>>

This will provide the following output:
  
user@computername TwilioScripts %node TerraformFlow.js myflow.json  
Working on contact flow block 0  
Working on contact flow block 1  
Working on contact flow block 2  
Working on contact flow block 3  
Working on contact flow block 4  
Working on contact flow block 5  
Working on contact flow block 6  
Working on contact flow block 7  
Working on contact flow block 8  
Working on contact flow block 9  
Working on contact flow block 10  
Working on contact flow block 11  
Working on contact flow block 12  
Working on contact flow block 13  
Working on contact flow block 14  
Working on contact flow block 15  
Working on contact flow block 16  
Working on contact flow block 17  
Working on contact flow block 18  
***** Make sure the Subflows are created before deploying the Terraform *****  
***** Make sure the Subflows are created before deploying the Terraform *****  
***** Make sure the Subflows are created before deploying the Terraform *****  
***** Make sure the Subflows are created before deploying the Terraform *****  

Running this script provides the following file outputs:

output.tfvars  
output.json  
variables.txt  

## output.tfvars

The output.tfvars file contains the format needed for a Terraform Variables file. If you have other items to deploy in your Terraform template then copy the contents of this file and add it to your existing tfvars file.

## output.json

The output.json file is the JSON of your parameterised Studio Flow. The contents of this file would be entered into your main.tf file to be deployed. 

resource "twilio_studio_flows_v2" "flow" {  
  &nbsp;&nbsp;commit_message = "first draft"  
  &nbsp;&nbsp;friendly_name  = "terraform flow"  
  &nbsp;&nbsp;status         = "draft"  
  &nbsp;&nbsp;definition = jsonencode( <<output.json goes here >>)  
}  


## variables.txt

The variables.txt file contains the declaration of variables in the main Terraform file (main.tf). Simply copy and paste the contents to that file (Usually before we call the resorces to be delivered).

e.g:  
terraform {  
&nbsp;&nbsp;required_providers {  
&nbsp;&nbsp;&nbsp;&nbsp;twilio = {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source  = "twilio/twilio"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version = ">=0.18.18"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;}  
}  

provider "twilio" {  
&nbsp;&nbsp;account_sid = var.credentials.account_sid  
&nbsp;&nbsp;username    = var.credentials.username  
&nbsp;&nbsp;password    = var.credentials.password  
}

variable "credentials" {  
&nbsp;&nbsp;type = object({  
&nbsp;&nbsp;&nbsp;&nbsp;account_sid = string  
&nbsp;&nbsp;&nbsp;&nbsp;username    = string  
&nbsp;&nbsp;&nbsp;&nbsp;password    = string  
&nbsp;&nbsp;})  
&nbsp;&nbsp;sensitive = false  
}

<< contents of variables.txt >>
