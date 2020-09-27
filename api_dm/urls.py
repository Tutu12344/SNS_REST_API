from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api_dm import views
app_name = "dm"

router = DefaultRouter()
# //basenameを指定しないとserializerが同じなので識別してくれない
router.register("message",views.MessageViewSet,basename="message")
router.register("inbox",views.InboxListView,basename="inbox")

urlpatterns = [
    path('', include(router.urls))
]