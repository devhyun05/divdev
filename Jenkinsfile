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
                dir('frontend/src/_tests_'){
                    echo 'testing the application...'
                    sh 'yarn test'              
                }
            }
        }

        stage("deploy") {
            steps {
                  echo 'Deploying the application...'
                dir('frontend') {
                    sh 'cp -r build/* ../backend/public'
                }
              
            }
        }
    }
}