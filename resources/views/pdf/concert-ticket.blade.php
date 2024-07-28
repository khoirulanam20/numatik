<!DOCTYPE html>
<html>
<head>
    <title>Tiket Konser</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .ticket { border: 2px solid #000; padding: 20px; margin: 20px; }
        .header { font-size: 24px; font-weight: bold; }
        .info { margin-top: 20px; }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="header">Tiket Konser</div>
        <div class="info">
            <p><strong>Nama Konser:</strong> {{ $ticket->concert->concert_name }}</p>
            <p><strong>Lokasi:</strong> {{ $ticket->concert->concert_location }}</p>
            <p><strong>Tanggal:</strong> {{ $ticket->concert->concert_date }}</p>
            <p><strong>Harga:</strong> Rp {{ number_format($ticket->concert->concert_price, 0, ',', '.') }}</p>
            <p><strong>Status:</strong> {{ $ticket->status }}</p>
        </div>
    </div>
</body>
</html>
