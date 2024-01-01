pipeline {
    agent any

    tools {nodejs "nodejs"}
    
    stages {
       
        stage("build") {
            steps {
                dir('frontend'){
                    echo 'Building the application...'                    
                    sh "npm install -g yarn"
                    sh 'yarn install' 
                    sh 'yarn build' 
                }
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
            }
        }

        stage("deploy") {
            steps {
                echo 'Deploying the application...'
            }
        }
    }
}