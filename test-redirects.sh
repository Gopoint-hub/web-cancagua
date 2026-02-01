#!/bin/bash

echo "🔍 Testing Redirecciones 301 - Cancagua"
echo "========================================"
echo ""

BASE_URL="http://localhost:3000"

# Función para testear una redirección
test_redirect() {
  local from=$1
  local expected_to=$2
  local priority=$3
  
  echo -n "[$priority] $from → "
  
  # Obtener el header Location
  location=$(curl -s -I "${BASE_URL}${from}" | grep -i "^location:" | cut -d' ' -f2 | tr -d '\r\n')
  status=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${from}")
  
  if [ "$status" = "301" ]; then
    if [[ "$location" == *"$expected_to"* ]]; then
      echo "✅ OK ($status → $location)"
    else
      echo "❌ FAIL (Expected: $expected_to, Got: $location)"
    fi
  else
    echo "❌ FAIL (Status: $status, no 301)"
  fi
}

echo "🔴 CRÍTICAS (280 clicks/mes)"
echo "----------------------------"
test_redirect "/biopiscinas/" "/servicios/biopiscinas" "🔴"
test_redirect "/hot-tub/" "/servicios/hot-tubs" "🔴"
test_redirect "/hot-tub/fin-de-semana/" "/servicios/hot-tubs" "🔴"
test_redirect "/servicios/" "/" "🔴"
test_redirect "/promos/" "/" "🔴"
test_redirect "/cafeteria-saludable-frutillar/" "/cafeteria" "🔴"

echo ""
echo "🟠 ALTAS (23 clicks/mes)"
echo "------------------------"
test_redirect "/sonoterapia/" "/servicios/masajes" "🟠"
test_redirect "/categoria/giftcards/" "/" "🟠"
test_redirect "/menu/" "/carta" "🟠"
test_redirect "/yoga-nueva/" "/clases" "🟠"

echo ""
echo "🟡 MEDIAS (muestra)"
echo "------------------"
test_redirect "/home/" "/" "🟡"
test_redirect "/programas/" "/experiencias/pases-reconecta" "🟡"
test_redirect "/faq/" "/contacto" "🟡"
test_redirect "/hot-tubs/" "/servicios/hot-tubs" "🟡"

echo ""
echo "✅ Test con query string"
echo "------------------------"
location_with_qs=$(curl -s -I "${BASE_URL}/hot-tub/?utm_source=google" | grep -i "^location:" | cut -d' ' -f2 | tr -d '\r\n')
if [[ "$location_with_qs" == *"utm_source=google"* ]]; then
  echo "✅ Query strings se preservan: $location_with_qs"
else
  echo "❌ Query strings NO se preservan: $location_with_qs"
fi

echo ""
echo "========================================"
echo "Test completado!"
