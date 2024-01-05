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

        stage("Build Docker Image") {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build("vigorous_lehmann:latest", "./backend")
                }
            }
        }

        stage("Push to Heroku") {
            steps {
                echo 'Pushing Docker image to Heroku Container Registry...'
                script {
                    withCredentials([usernamePassword(credentialsId: 'my-heroku-credentials', usernameVariable: 'HEROKU_USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "docker login --password=$PASSWORD registry.heroku.com"
                    }
                    sh "docker tag vigorous_lehmann:latest registry.heroku.com/divdev/web"
                    sh "docker push registry.heroku.com/divdev/web"
                }
            }
        }

        stage("Deploy to Heroku") {
            steps {
                echo 'Deploying the application to Heroku...'
                sh 'heroku container:release web -a divdev'
            }
        }
    }
}
