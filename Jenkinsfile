pipeline {
    agent {
        label 'docker'
        docker { image 'node:14' }
    }

    stages {
        stage("build") {
            steps {
                dir('frontend'){
                    echo 'Building the application...'                    
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