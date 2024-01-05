pipeline {
    agent any

    tools {nodejs "nodejs"}

  
    stages {
        stage("Build") {
            steps {
                echo 'Building the application...'
                dir('frontend') {
                    sh "npm install -g yarn"
                    sh 'yarn install'
                    sh 'yarn build'
                }
            }
        }

        stage("Test") {
            steps {
                echo 'Testing the application...'
                dir('frontend/src/_tests_') {
                    sh 'yarn test login.test.js'
                }
            }
        }

         stage("deploy") {
            steps {
                echo 'Deploying the application...'                               
                
                dir('frontend') {
                    sh 'yarn build'
                    sh 'cp -r build/* ../backend/public'
                }
                dir('backend') {
                    sh 'heroku git:remote -a divdev'
         
                    sh 'git push heroku main'
                }
              
            }
        }
    }
}
