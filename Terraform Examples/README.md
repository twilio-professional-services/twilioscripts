# Terraform Examples

This is an example of how to create 1 Nobody Queue and Nobody Workflow, 7 Queues and Inbound Workflow, and a Sync Table to be used within Twilio.

To initialise the Terraform template run the following command from the CLI in the path the main.tf file is held:  
terraform init   

To deploy a Terraform template with a variable file use the following command from the CLI where these files are held:  

terraform apply -var-file="main.tfvars"