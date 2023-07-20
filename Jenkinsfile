pipeline {
  agent any
  stages {
        stage('Prune Docker data'){
          steps {
            sh 'docker system prune -a --volumes -f'
          }
        }
        stage('Stop Docker Compose') {
            steps {
                sh 'docker-compose -f .docker/staging/docker-compose.yml --env-file .docker/staging/.env down'
            }
        }
        stage('Start Docker Compose') {
            steps {
                sh 'docker-compose -f .docker/staging/docker-compose.yml --env-file .docker/staging/.env up -d'
            }
        }
        stage('Build and Setup') {
            steps {
                sh 'docker exec mens_api bash -c "npm run build && npm install && npm run db:migrate && npm run db:seed:all"'
            }
        }
    }
}
