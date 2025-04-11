import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";

const Cards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card>
                <CardHeader>
                    <CardTitle>Stable</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl sm:text-3xl font-bold">22</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Good</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl sm:text-3xl font-bold">12</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Critical</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl sm:text-3xl font-bold">2</CardContent>
            </Card>
        </div>
    )
}

export default Cards;