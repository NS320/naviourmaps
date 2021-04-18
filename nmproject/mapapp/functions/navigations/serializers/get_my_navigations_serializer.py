from rest_framework import serializers
from ....models import Navigations


class GetMyNavigationsSerializer(serializers.ModelSerializer):
    class Meta:
        fields=(
            'navigation_id',
            'navigation_name',
            'start_address',
            'start_lat',
            'start_lng',
            'goal_address',
            'goal_lat',
            'goal_lng',
            'is_favorite',
            'is_private',
            'navigations_created_time',
            'navigations_updated_time'
        )
        model = Navigations