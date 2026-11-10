
pipeline {
    agent {
        label 'rootless-docker'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo 'EasyPick source code downloaded!'
            }
        }

        stage('Check Environment') {
            steps {
                sh 'git --version'
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Configure Database Credentials') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'mysql-root-password',
                        variable: 'MYSQL_ROOT_PASSWORD'
                    ),
                    string(
                        credentialsId: 'mysql-app-password',
                        variable: 'MYSQL_PASSWORD'
                    )
                ]) {
                    sh '''
                        umask 077
                        printf 'MYSQL_ROOT_PASSWORD=%s\\nMYSQL_PASSWORD=%s\\n' \
                          "$MYSQL_ROOT_PASSWORD" "$MYSQL_PASSWORD" > .env
                    '''
                }
            }
        }

        stage('Validate Docker Compose') {
            steps {
                sh 'docker compose config -q'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy EasyPick') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Check Containers') {
            steps {
                sh 'docker compose ps'
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
        }

        success {
            echo 'EasyPick CI/CD completed successfully!'
        }

        failure {
            echo 'EasyPick pipeline failed. Check the console output.'
        }
    }
}
