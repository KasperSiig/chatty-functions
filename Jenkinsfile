pipeline {
  environment {
    FIREBASE = credentials("firebase-deploy-token")
  }
  agent {
    kubernetes {
      label 'app'
      defaultContainer 'jnlp'
      yaml """
          apiVersion: v1
          kind: Pod
          metadata:
            labels:
              component: ci
          spec:
            serviceAccount: jenkins
            containers:
              - name: node
                image: kasperns/node-jenkins
                command:
                  - cat
                tty: true
              - name: firebase
                image: devillex/docker-firebase
                command:
                  - cat
                tty: true
      """
    }
  }
  stages {
    stage('Build') {
      steps {
        container('node') {
          sh("yarn --cwd functions install")
          sh("yarn --cwd functions build ")
        }
      }
    }
    stage('Deploy') {
      when {
        expression {
            GIT_BRANCH = 'origin/' + sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
            return GIT_BRANCH == 'origin/master' || params.FORCE_FULL_BUILD
        }
      }
      steps {
        container('firebase') {
          sh("firebase deploy --token $FIREBASE")
        }
      }
    }
  }
}
