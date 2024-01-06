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
                    sh 'cp -r build/* ../backend/public'
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
                dir('backend') {
                    sh 'git checkout -b temp_branch'
                    sh 'git add .'
                  
                    sh 'git checkout main'
                    sh 'git merge -Xtheirs --no-edit temp_branch'               
                    sh 'git branch -D temp_branch'
                    sh 'git push heroku main'    
                  
                }        
   



              

            }
        }
    }
}

