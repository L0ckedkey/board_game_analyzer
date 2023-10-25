from django.http import HttpResponse
import json
import pickle
from django.views.decorators.csrf import csrf_exempt

# Load the model from the pickle file
with open('./api/models.pickle', 'rb') as file:
    model = pickle.load(file)

def Hello(request):
    return HttpResponse("Hello")


@csrf_exempt
def Predictor(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    review = body['review']
    print(review)
    
    # Load the classifier from the saved file
    with open("./api/models.pickle", "rb") as file:
        classifier = pickle.load(file)
        
    review_features = {
        'feature1': review
        # Add more features here based on your training data
    }

    # Classify the review using the classifier
    classification = classifier.classify(review_features)
    return HttpResponse(classification)
