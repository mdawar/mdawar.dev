terraform {
  required_version = ">= 0.12"

  backend "s3" {
    profile              = "default"
    bucket               = "terraform-mdawar"
    key                  = "terraform.tfstate"
    workspace_key_prefix = "workspace"
    region               = "us-east-1"
  }
}
