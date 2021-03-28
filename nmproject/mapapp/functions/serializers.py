from rest_framework import serializers
from ..models import MyUser, Address

class GetAllAddressSerializer(serializers.ModelSerializer):
    class Meta:
        fields=(
            'address_id',
            'address',
            'address_name',
            'is_favorite',
            'is_private',
            'address_created_time',
            'address_updated_time'
        )
        model = Address