pipeline {
  agent any
  stages {
    stage('Update Code') {
      steps {
        sh 'git pull'
      }
    }
    stage('Build') {
      steps {
        sh 'make api-update'
      }
    }
  }
}
