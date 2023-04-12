# Terraform Examples

This is an example of how to create 1 Studio Call Flow. It is intended that you run the script to parameterise your call flow first, copy the output.json and paste it into line 36 to replace < your call flow json >.

Copy the content from variables.txt and paste it into the main.tf file.

Copy the content of the output.tfvars and paste it into the variables section of the main.tfvars file.

To initialise the Terraform template run the following command from the CLI in the path the main.tf file is held:
  
terraform init   

To deploy a Terraform template with a variable file use the following command from the CLI where these files are held:  

terraform apply -var-file="main.tfvars"