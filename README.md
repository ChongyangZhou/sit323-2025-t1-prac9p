# SIT323 Week 9.1 – MongoDB Replica Set with Node.js on Kubernetes

This project sets up a MongoDB Replica Set on Kubernetes and deploys a Node.js application that connects securely to the replica set using credentials stored in Kubernetes Secrets.

## 🧱 Prerequisites

- Docker
- Kubernetes (Minikube or any other cluster)
- kubectl CLI
- Node.js + npm
- MongoDB Shell (`mongosh`)

## 📁 Project Structure

- `createMongoDBSecrets.yaml` – stores root MongoDB credentials
- `mongo-configmap.yaml` – MongoDB config with replica set
- `createHeadlessService.yaml` – headless service for MongoDB discovery
- `createStatefulSet.yaml` – StatefulSet for MongoDB pods
- `app-mongo-secret.yaml` – app user credentials for MongoDB
- `deployment.yaml` – Node.js app deployment
- `index.js` – Node.js code for CRUD operations

## 🚀 Setup Guide

### 1. Set up MongoDB Replica Set

```bash
kubectl apply -f createMongoDBSecrets.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f createHeadlessService.yaml
kubectl apply -f createStatefulSet.yaml
```

### 2. Verify Pods

```bash
kubectl get pods
```

Ensure `mongo-0`, `mongo-1`, and `mongo-2` are running.

### 3. Initialize Replica Set

```bash
kubectl exec -it mongo-0 -- mongosh
```

In the shell:

```javascript
rs.initiate()
rs.status()
```

Verify that `mongo-0` is `PRIMARY`.

### 4. Set Up App Secrets

```bash
kubectl apply -f app-mongo-secret.yaml
```

### 5. Update and Deploy the Node App

Update `deployment.yaml` with:

- `MONGO_USERNAME`
- `MONGO_PASSWORD`
- `MONGO_URI` (with `replicaSet=rs0` and `authSource=myappdb`)

Update `index.js` to use these values.

### 6. Build and Deploy the App

```bash
docker build -t node-app:1.0 .
kubectl apply -f deployment.yaml
```

### 7. Test Application

App will connect to MongoDB and insert:

```json
{ "message": "Hello from Node.js!" }
```

You can extend `index.js` with:
- `findOne`
- `updateOne`
- `deleteOne`

### 8. CRUD Testing (Shell)

```bash
kubectl exec -it mongo-0 -- mongosh
```

Inside:

```javascript
use myappdb
db.students.insertOne({ name: "John", age: 22 })
db.students.find()
db.students.updateOne({ name: "John" }, { $set: { age: 23 } })
db.students.deleteOne({ name: "John" })
```

## ✅ Expected Outcome

- MongoDB replica set up with persistent storage
- Node.js app performs full CRUD via secure connection
- Secrets are securely managed using Kubernetes resources

## 🔗 Repo

[Gitrepo: sit323-2025-t1-prac9p](https://github.com/ChongyangZhou/sit323-2025-t1-prac9p)
