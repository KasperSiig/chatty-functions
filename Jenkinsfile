pipeline {
  environment {
    FIREBASE = credentials("firebase-deploy-token")
    SERVICEACCOUNT = credentials("chatty_firebase_service_account")
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
          sh("echo $SERVICEACCOUNT > functions/serviceaccount.json")
          sh("yarn --cwd functions install")
          sh("yarn --cwd functions build ")
          sh("yarn --cwd functions lint")
        }
      }
    }
    stage('Deploy') {
      //when {
        //branch 'master'
      //}
      steps {
        withCredentials([file(credentialsID: 'chatty_firebase_service_account', variable: service_account)]) {
          container('firebase') {
            sh("cp \$service_account/ functions/serviceaccount.json")
            sh("firebase deploy --token $FIREBASE")
          } 
        }
      }
    }
  }
}
