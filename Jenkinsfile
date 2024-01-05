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

           stage("build-docker-image") {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build("vigorous_lehmann:latest", "./backend")  
                }
            }
        }

        stage("push-to-heroku") {
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

        stage("deploy-to-heroku") {
            steps {
                echo 'Deploying the application to Heroku...'
                script {
                    sh 'heroku container:release web -a divdev'  
                }
            }
        }


    }
    }
}