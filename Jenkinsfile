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
                    sh 'yarn test login.test.js'              
                }
            }
        }

        stage("deploy") {
            steps {
                echo 'Deploying the application...'   
                         
                dir('backend') {
                    sh '''                        
                        git config --global --add safe.directory '*'
                 
                        git remote -v
                        git push heroku main
                    '''
                }

                
                // dir('frontend') {
                //     sh 'yarn build'
                //     sh 'cp -r build/* ../backend/public'
                // }
                // dir('../backend') {
                //     sh 'git push heroku main'
                // }
              
            }
        }
    }
}