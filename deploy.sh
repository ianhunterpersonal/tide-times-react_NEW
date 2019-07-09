#!/bin/bash

DEPLOY_DIR=../tide-times-react-deploy
(
    mkdir -p build
    rm -rf build/*
    yarn build;
    mkdir -p ${DEPLOY_DIR}
    cp -Rp build/* ${DEPLOY_DIR}
    (
        COMMITER="Ian Hunter <ian.hunter.personal@gmail.com>"
        cd ${DEPLOY_DIR}
        if [ ! -e .git ]; then
            git init
            git add .
            git commit --author="$COMMITER"  -m "first commit"
            git remote add origin https://ianhunterpersonal@github.com/ianhunterpersonal/tide-times-react-deploy.git
            cmd /C "git push -u origin master"
        else
            git add .
            git commit --author="$COMMITER"  -m "Another update"
            cmd /C "git push"
        fi
    )
    
    
    
)

