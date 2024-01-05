pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
                stage('Install Heroku CLI') {
            steps {
                script {
                    sh 'curl https://cli-assets.heroku.com/install.sh | sh'
                }
            }
        }

        stage('Login to Heroku') {
            steps {
                script {
                    sh 'heroku container:login'
                }
            }
        }


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
                dir('frontend') {
                    sh 'yarn build'
                    sh 'cp -r build/* ../backend/public'
                }

                dir('backend') {
                    sh '''                   
                        git push heroku main
                    '''
                }

                

                
            }
        }
    }
}