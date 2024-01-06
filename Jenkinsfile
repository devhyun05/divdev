pipeline {
    agent any

    environment {
        HEROKU_API_KEY = credentials('my-heroku-api-key')
    }

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
                script {
                    withCredentials([string(credentialsId: 'my-heroku-api-key', variable: 'HEROKU_API_KEY')]) {
                        sh 'git push heroku development'
                    }
                }
              
            }
        }
    }
}
