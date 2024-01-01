pipeline {
    agent any

    stages {
        stage('Prepare') {
            echo 'Installing dependencies...'
            sh "npm install -g yarn"
            sh 'yarn install' 
        }

        stage("build") {
            steps {
                dir('frontend'){
                    echo 'Building the application...'                    

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